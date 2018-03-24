pipeline {
    agent {
        docker { image 'node:9-alpine' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
}
