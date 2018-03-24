def label = "mypod-${UUID.randomUUID().toString()}"
podTemplate(label: label) {
    node(label) {
        stage('checkout') {
            checkout scm
        }

        stage('read file') {
            sh 'cat hello.txt'
        }
    }
}
