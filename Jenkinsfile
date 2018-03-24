void with_slack_failure_notifier(Closure task) {
    try {
        task()
    } catch (e) {
        echo "BUILD HAS FAILED"
        throw e
    }
}

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

                    with_slack_failure_notifier {
                        sh "docker login -u ${USERNAME} -p ${PASSWORD} "
                        sh "docker build -t ${USERNAME}/app:${env.BUILD_NUMBER} ."
                        sh "docker run -it ${USERNAME}/app:${env.BUILD_NUMBER} en"
                        sh "docker push ${USERNAME}/app:${env.BUILD_NUMBER} "
                    }
                }
            }
        }

        stage('logging') {
            containerLog('docker')
        }
    }
}
