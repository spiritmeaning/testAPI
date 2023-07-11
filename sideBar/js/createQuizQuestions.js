        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyDgOZOH3upRrphZP834oOLJuHpCY9wcrzE",
            authDomain: "spiritmeaning-email.firebaseapp.com",
            projectId: "spiritmeaning-email",
            storageBucket: "spiritmeaning-email.appspot.com",
            messagingSenderId: "274529228758",
            appId: "1:274529228758:web:d8b9d3646c2880de74f677",
            measurementId: "G-ZPGXSCFT60"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        var database = firebase.database();
        var quizzesRef; // Declare quizzesRef variable

        firebase.auth().signInWithEmailAndPassword('spiritmeaning@gmail.com', 'SriRamSita1234$#@!')
            .then(() => {
                quizzesRef = database.ref('quizzes'); // Assign value to quizzesRef
            });
        // Function to populate the quiz list
        function populateQuizList() {
            firebase.auth().signInWithEmailAndPassword('spiritmeaning@gmail.com', 'SriRamSita1234$#@!')
                .then(() => {
                    quizzesRef = database.ref('quizzes');
                    quizzesRef.once('value')
                        .then(snapshot => {
                            const quizList = document.getElementById('quizList');
                            quizList.innerHTML = '<option value="">Select Quiz</option>';

                            snapshot.forEach(childSnapshot => {
                                const quiz = childSnapshot.val();
                                const option = document.createElement('option');
                                option.value = childSnapshot.key;
                                option.textContent = quiz.name;
                                quizList.appendChild(option);
                            });
                        })
                        .catch(error => {
                            console.error('Error retrieving quiz list:', error);
                        });
                });
        }

        // Function to add a new question
        function addQuestion() {
            const questionsContainer = document.getElementById('questionsContainer');
            const questionCount = questionsContainer.childElementCount + 1;

            const questionRow = document.createElement('div');
            questionRow.classList.add('mb-3', 'question-row');
            questionRow.id = 'question' + questionCount;

            const questionLabel = document.createElement('label');
            questionLabel.classList.add('form-label');
            questionLabel.textContent = 'Question ' + questionCount;
            questionRow.appendChild(questionLabel);

            const inputGroup = document.createElement('div');
            inputGroup.classList.add('input-group');
            questionRow.appendChild(inputGroup);

            const questionInput = document.createElement('input');
            questionInput.type = 'text';
            questionInput.classList.add('form-control', 'question-input');
            questionInput.required = true;
            inputGroup.appendChild(questionInput);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'delete-button');
            deleteButton.type = 'button';
            deleteButton.onclick = function () {
                removeQuestion(this);
            };
            inputGroup.appendChild(deleteButton);

            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('bi', 'bi-dash');
            deleteButton.appendChild(deleteIcon);

            questionsContainer.appendChild(questionRow);
        }

        // Function to remove a question
        function removeQuestion(button) {
            const questionRow = button.closest('.question-row');
            questionRow.remove();
        }

        // Function to confirm and submit the quiz
        function confirmSubmit() {
            const quizNameInput = document.getElementById('quizNameInput');
            const quizName = quizNameInput.value.trim();
            if (quizName === '') {
                alert('Please enter a quiz name.');
                return;
            }

            const questionsContainer = document.getElementById('questionsContainer');
            const questionInputs = questionsContainer.getElementsByClassName('question-input');
            const questions = [];
            for (let i = 0; i < questionInputs.length; i++) {
                const questionInput = questionInputs[i];
                const questionText = questionInput.value.trim();
                if (questionText === '') {
                    alert('Please enter a question text for question ' + (i + 1) + '.');
                    return;
                }
                questions.push(questionText);
            }

            const quiz = {
                name: quizName,
                questions: questions
            };

            quizzesRef.push(quiz)
                .then(() => {
                    alert('Quiz submitted successfully.');
                    quizNameInput.value = '';
                    questionsContainer.innerHTML = '';
                    addQuestion();
                    populateQuizList();
                })
                .catch(error => {
                    console.error('Error submitting quiz:', error);
                    alert('Failed to submit quiz. Please try again later.');
                });
        }

        // Function to load a quiz
        function loadQuiz(selectElement) {
            const quizId = selectElement.value;

            if (quizId === '') {
                return;
            }
            quizzesRef.child(quizId).once('value')
                .then(snapshot => {
                    quizzesRef.child(quizId).once('value')
                        .then(snapshot => {
                            const quiz = snapshot.val();
                            const quizNameInput = document.getElementById('quizNameInput');
                            quizNameInput.value = quiz.name;

                            const questionsContainer = document.getElementById('questionsContainer');
                            questionsContainer.innerHTML = '';

                            quiz.questions.forEach((question, index) => {
                                const questionCount = index + 1;

                                const questionRow = document.createElement('div');
                                questionRow.classList.add('mb-3', 'question-row');
                                questionRow.id = 'question' + questionCount;

                                const questionLabel = document.createElement('label');
                                questionLabel.classList.add('form-label');
                                questionLabel.textContent = 'Question ' + questionCount;
                                questionRow.appendChild(questionLabel);

                                const inputGroup = document.createElement('div');
                                inputGroup.classList.add('input-group');
                                questionRow.appendChild(inputGroup);

                                const questionInput = document.createElement('input');
                                questionInput.type = 'text';
                                questionInput.classList.add('form-control', 'question-input');
                                questionInput.required = true;
                                questionInput.value = question;
                                inputGroup.appendChild(questionInput);

                                const deleteButton = document.createElement('button');
                                deleteButton.classList.add('btn', 'delete-button');
                                deleteButton.type = 'button';
                                deleteButton.onclick = function () {
                                    removeQuestion(this);
                                };
                                inputGroup.appendChild(deleteButton);

                                const deleteIcon = document.createElement('i');
                                deleteIcon.classList.add('bi', 'bi-dash');
                                deleteButton.appendChild(deleteIcon);

                                questionsContainer.appendChild(questionRow);
                            });

                            const updateButton = document.getElementById('updateBtn');
                            const submitButton = document.getElementById('submitBtn');
                            updateButton.disabled = true;
                            submitButton.disabled = false;
                        })
                })
                .catch(error => {
                    console.error('Error loading quiz:', error);
                    alert('Failed to load quiz. Please try again later.');
                });
        }

        function updateQuiz() {
            const quizId = document.getElementById('quizList').value;
            const quizNameInput = document.getElementById('quizNameInput');
            const questionsContainer = document.getElementById('questionsContainer');
            const updateStatus = document.getElementById('updateStatus');

            // Validate quiz name
            const quizName = quizNameInput.value.trim();
            if (quizName === '') {
                alert('Please enter a quiz name.');
                return;
            }

            // Gather updated questions
            const questionInputs = questionsContainer.getElementsByClassName('question-input');
            const updatedQuestions = [];
            for (let i = 0; i < questionInputs.length; i++) {
                const questionInput = questionInputs[i];
                const questionText = questionInput.value.trim();
                if (questionText === '') {
                    alert('Please enter a question text for question ' + (i + 1) + '.');
                    return;
                }
                updatedQuestions.push(questionText);
            }

            // Update the quiz in the database
            quizzesRef.child(quizId).update({
                name: quizName,
                questions: updatedQuestions
            })
                .then(() => {
                    updateStatus.textContent = 'Questions have been updated.';
                    quizNameInput.value = '';
                    questionsContainer.innerHTML = '';
                    addQuestion();
                    populateQuizList();
                    updateBtn.disabled = true;
                    submitBtn.disabled = false;
                })
                .catch(error => {
                    console.error('Error updating quiz:', error);
                    alert('Failed to update quiz. Please try again later.');
                });
        }
        // Function to edit a quiz
        function editQuiz() {
            const quizList = document.getElementById('quizList');
            const quizId = quizList.value;
            if (quizId === '') {
                alert('Please select a quiz to edit.');
                return;
            }
            window.location.href = '/edit-quiz?id=' + quizId;
        }

        // Populate the quiz list on page load
        populateQuizList();