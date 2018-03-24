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
                withCredentials([
                    usernamePassword(credentialsId: 'docker-hub-credentials',
                    usernameVariable: 'USERNAME', 
                    passwordVariable: 'PASSWORD')]) {
                    
                    sh "docker login -u ${USERNAME} -p ${PASSWORD} "
                    sh "docker build -t ${USERNAME}:${env.BUILD_NUMBER} ."
                    sh "docker push ${USERNAME}:${env.BUILD_NUMBER} "
                }
            }
        }

        stage('logging') {
            containerLog('docker')
        }
    }
}
