podTemplate(label: 'alpine', containers: [
  containerTemplate(name: 'alpine', image: 'alpine', ttyEnabled: true, command: 'cat')
  ]) {

  node('alpine') {
    stage('env') {
      container('alpine') {
          sh 'env'
      }
    }
  }
}
