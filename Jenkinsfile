def image = "christopherL91"
def label = "mypod-${UUID.randomUUID().toString()}"

podTemplate(label: label,
    containers: [containerTemplate(name: 'jnlp', image: 'empatica/jnlp-slave-with-docker', ttyEnabled: true, command: 'cat')],
    volumes: [hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')]
) {
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
