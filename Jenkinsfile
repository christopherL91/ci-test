pipeline {
  agent {
    kubernetes {
      //cloud 'kubernetes'
      label 'mypod'
      containerTemplate {
        name 'alpine'
        image 'alpine'
        ttyEnabled true
        command 'cat'
      }
    }
  }
  stages {
    stage('echo') {
      steps {
        container('alpine') {
          sh 'echo hello world'
        }
      }
    }
  }
}
