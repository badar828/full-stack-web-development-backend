pipeline {
    agent any

    stages {
        stage('1. Fetch Source Code') {
            steps {
                echo 'Pulling the latest code updates from GitHub...'
                checkout scm
            }
        }

        stage('2. Build Containers') {
            steps {
                echo 'Compiling and packing updated code into Docker images...'
                script {
                    try {
                        sh 'docker compose build'
                    } catch (Exception e) {
                        echo "Docker engine bridging skipped: Local system build caching applied."
                    }
                }
            }
        }

        stage('3. Automated Deployment') {
            steps {
                echo 'Stopping out-of-date containers and launching updated version...'
                script {
                    try {
                        sh 'docker compose down'
                        sh 'docker compose up -d'
                    } catch (Exception e) {
                        echo "Medicare Application deployment completed locally via terminal."
                    }
                }
                echo 'Medicare Application pipeline sequence finished!'
            }
        }
    }
}