def image = "christopherL91"
def label = "mypod-${UUID.randomUUID().toString()}"
podTemplate(label: label,
    containers: [containerTemplate(name: 'docker', image: 'docker', ttyEnabled: true, command: 'cat')],
    volumes: [hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')]
) {
    node(label) {
        stage('checkout') {
            checkout scm
        }

        stage('docker build') {
            container('docker') {
                sh "docker build -t christopherl91/app ."
            }
        }

        stage('logging') {
            containerLog('docker')
        }
    }
}
