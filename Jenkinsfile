def label = "mypod-${UUID.randomUUID().toString()}"

podTemplate(label: label, 
    containers: [
        containerTemplate(name: 'docker', image: 'docker', ttyEnabled: true, command: 'cat')
    ],
    volumes: [
        hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')
    ]
) {
    node(label) {
        stage('checkout') {
            checkout scm
        }

        stage('read file') {
            container('docker') {
                docker.image('alpine').inside {
                    sh 'make test'
                }
            }
        }

        stage('logging') {
            containerLog('docker')
        }
    }
}
