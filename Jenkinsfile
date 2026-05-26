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
                sh 'docker compose build'
            }
        }

        stage('3. Automated Deployment') {
            steps {
                echo 'Stopping out-of-date containers and launching updated version...'
                sh 'docker compose down'
                sh 'docker compose up -d'
                echo 'Medicare Application is up-to-date and live!'
            }
        }
    }
}