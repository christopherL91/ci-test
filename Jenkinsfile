def image = "christopherL91"
def label = "mypod-${UUID.randomUUID().toString()}"

podTemplate(label: label) {
    node(label) {
        def app

        stage('checkout') {
            checkout scm
        }

        stage('read file') {
            app = docker.build("my-image:${env.BUILD_ID}")
            app.inside = {
                sh 'echo "Tests passed"'
            }
        }

        stage('logging') {
            containerLog('docker')
        }
    }
}
