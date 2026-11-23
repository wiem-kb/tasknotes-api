pipeline {
  agent any
 
  environment {
    APP_IMAGE = 'tasknotes-api'
    APP_NAME  = 'tasknotes-api'
  }
 
  stages {
stage('Recuperation du code') {
      steps {
        checkout scm
      }
    }
    stage('Tests') {
      steps {
        bat 'docker build --target test -t %APP_IMAGE%:test .'
      }
    }
    stage('Construction image') {
      steps {
        bat 'docker build -t %APP_IMAGE%:%BUILD_NUMBER% .'
      }
    }
    stage('Deploiement') {
      steps {
        bat '''
          docker rm -f %APP_NAME% || true
          docker run -d --name %APP_NAME% -p 3000:3000 \
            -e APP_VERSION=%BUILD_NUMBER% %APP_IMAGE%:%BUILD_NUMBER%
        '''
      }
    }
    stage('Verification') {
      steps {
        bat '''
          sleep 3
          docker exec %APP_NAME% wget -qO- http://localhost:3000/health
        '''
      }
    }
  }
 
  post {
    success {
      echo "Pipeline reussi : version %env.BUILD_NUMBER% deployee."
    }
    failure {
      echo 'Pipeline en echec : consulter la console de l etape en erreur.'
    }
  }
}
