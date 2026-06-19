pipeline {
    agent any

    tools {
        nodejs '18.20.8' // Ensure this matches the name of your Node.js installation in Jenkins
    }

    environment {
        // Define your Docker Hub repository and image tags
        IMAGE_REPO = 'prengineering' // Replace with your actual Docker Hub username/org
        IMAGE_TAG  = "0.0.${env.BUILD_NUMBER}"    // Uses the Jenkins build number as the unique tag
        API_URL = "https://api.roshankhatri08.com.np"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                // Using npm ci (Clean Install) is standard practice for CI/CD pipelines
                sh 'npm ci'
            }
        }

        stage('Build Frontend Asset') {
            steps {
                echo 'Building Vite production assets...'
                // This triggers 'vite build' and outputs files into the /dist directory
                sh 'npm run build'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-login', 
                                                  usernameVariable: 'USERNAME', 
                                                  passwordVariable: 'PASSWORD')]) {
                    sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                    echo 'Logged in successfully'
                }
            }
        }

        stage('Docker build') {
            steps {
                echo 'Building frontend Docker image...'
                // Builds and tags the image using your variables
                sh "docker build --build-arg VITE_API_URL=${API_URL} -t ${IMAGE_REPO}/frontend:${IMAGE_TAG} -t ${IMAGE_REPO}/frontend:latest ."
                sh "docker push ${IMAGE_REPO}/frontend:${IMAGE_TAG}"
                sh "docker push ${IMAGE_REPO}/frontend:latest"
            }
        }
    }

    post {
        success {
            echo 'Frontend build and push completed successfully!'
        }
        failure {
            echo 'Frontend pipeline failed. Check logs.'
        }
    }
}
