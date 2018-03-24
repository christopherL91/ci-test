def label = "mypod-${UUID.randomUUID().toString()}"
podTemplate(label: label) {
    node(label) {
        stage('checkout') {
            checkout scm
        }

        stage('yes')
            sh 'yes'
        }
    }
}
