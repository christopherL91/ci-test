def label = "mypod-${UUID.randomUUID().toString()}"
podTemplate(label: label,
    containers: [containerTemplate(name: 'docker', image: 'docker', ttyEnabled: true, command: 'cat')],
    volumes: [hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')]
) {
    node(label) {
        try {
            notifyBuild('STARTED')
            stage('checkout') {
                checkout scm
            }

            stage('docker build') {
                container('docker') {
                    sh "docker build -t christopherl91/app:${env.BUILD_NUMBER} ."
                }
            }

            stage('docker test') {
                container('docker') {
                    sh "docker run christopherl91/app:${env.BUILD_NUMBER} env"
                }
            }

            stage('docker push') {
                container('docker') {
                    withCredentials([
                        usernamePassword(credentialsId: 'docker-hub-credentials',
                        usernameVariable: 'USERNAME',
                        passwordVariable: 'PASSWORD')]) {
                            sh "docker login -u ${USERNAME} -p ${PASSWORD} "
                            sh "docker push ${USERNAME}/app:${env.BUILD_NUMBER} "
                    }
                }
            }
        } catch(err) {
            currentBuild.result = "FAILED"
            throw err
        } finally {
            notifyBuild(currentBuild.result)
        }
    }
}

def notifyBuild(String buildStatus = 'STARTED') {
    // build status of null means successful
    buildStatus =  buildStatus ?: 'SUCCESSFUL'

    // Default values
    def colorName = 'RED'
    def colorCode = '#FF0000'
    def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
    def summary = "${subject} (${env.BUILD_URL})"
    def details = """<p>STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
    <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>"""

    // Override default values based on build status
    if (buildStatus == 'STARTED') {
        color = 'YELLOW'
        colorCode = '#FFFF00'
    } else if (buildStatus == 'SUCCESSFUL') {
        color = 'GREEN'
        colorCode = '#00FF00'
    } else {
        color = 'RED'
        colorCode = '#FF0000'
    }
    //sh "echo color: ${color}, message ${summary}"
}
