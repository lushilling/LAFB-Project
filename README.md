# Little Anchorage Financial Bank (LAFB) - Application Upgrade

This project allows members of LAFB to sign up to banking services by providing a first and last name.
The system takes this information and creates three additional parameters, a random number and random text generator to create the account number.
Additionally a random prize generator that allows users to win prizes for signing up.

The implementation of the three additional parameters comes from a micro-service architecture with easy rolling configuration changes provided by a Jenkins CI server.

The application configuration changes are implemented by changing the deployment.yaml files within the folder structure.
Full paths to the files are shown below with the available images.

## System Architecture


![ScreenShot](https://github.com/lushilling/LAFB-Project/blob/master/Images/Untitled%20Diagram.jpg)

![ScreenShot](https://github.com/lushilling/LAFB-Project/blob/master/Images/Capture.PNG)

## Application Images

Text Generator:
Configuration File : LAFB-Project/text_gen/deployment.yaml  
Line 18 can be adjusted to the following images:  
```
  A text generator providing three lowercase characters - jackflanagan93/text_gen_low3  
  A text generator providing two uppercase characters - jackflanagan93/text_gen_upc2
```
Number Generator:
Configuration File : LAFB-Project/num_gen/deployment.yaml  
Line 18 can be adjusted to the following images:  
```
  A number generator providing a single six digit integer - jackflanagan93/num_gen_6  
  A number generator providing a single eight digit integer - jackflanagan93/num_gen_8
```
Prize Generator:
Configuration File : LAFB-Project/prize_gen_node/deployment.yaml  
Line 18 can be adjusted to the following images:  
```
  A prize generator with a minimum of £50 and maximum of £100 - jackflanagan93/prize_generator_large
  A prize generator with a minimum of £0 and maximum of £50 - jackflanagan93/prize_generator_small
```
## Prerequisites and Getting Started

To start with the project you require an Microsoft Azure account and access to the portal.  
Follow the below steps to get the system setup and operational.
This project utilises the Azure Kubernetes Service (AKS)

Create Kubernetes Environment:  
Open the Azure CLI and enter the below commands:

```
az group create --name AKS --location uksouth
az aks create --name aks-test -g AKS --node-count 2
az aks get-credentials --name aks-test -g AKS
```
At this point, configure the DNS of the AKS to lackandjucyjenkins.uksouth.cloudapp.azure.com before proceeding.
Clone down project into Azure CLI:  

```
git clone https://github.com/lushilling/LAFB-Project.git
```

Verify Project and start services: 
Please ignore errors relating to JSON files, these are expected.
```
cd LAFB-Project
kubectl apply -f ./mongo  
kubectl apply -f ./db_connector  
kubectl apply -f ./prize_gen_node  
kubectl apply -f ./notification_server  
kubectl apply -f ./server  
kubectl apply -f ./text_gen  
kubectl apply -f ./num_gen  
kubectl apply -f ./static_website  
kubectl apply -f ./jenkins  
kubectl apply -f ./nginx  
```

Verify services have started by getting the status of kubernetes:
```
kubectl get pods
kubectl get services
kubectl get deployments
```

Once Jenkins shown as started, login to jenkins using http://lackandjucyjenkins.uksouth.cloudapp.azure.com/jenkins
The admin password for jenkins can be found within the log file here by running the following command in Azure.
```
kubectl logs jenkins
```
Install with default configuration and create a new pipeline project to be used for initial setup.
The deployment pipeline script is as below:
```
pipeline{
        agent any
        stages{
                stage('Clone Project Down'){
                        steps{
                            dir ("/var/jenkins_home/workspace/Group-Project"){
                                sh "git clone https://github.com/lushilling/LAFB-Project.git"
                            }
                        }
                }
                stage('Deploy Application Images'){
                        steps{
                            dir ("/var/jenkins_home/workspace/Group-Project/LAFB-Project"){
                            sh "kubectl apply -f ./mongo"
                            sh "kubectl apply -f ./db_connector/deployment.yaml"
                            sh "kubectl apply -f ./db_connector/service.yaml"
                            sh "kubectl apply -f ./prize_gen_node/deployment.yaml"
                            sh "kubectl apply -f ./prize_gen_node/service.yaml"
                            sh "kubectl apply -f ./notification_server/"
                            sh "kubectl apply -f ./server/"
                            sh "kubectl apply -f ./text_gen/"
                            sh "kubectl apply -f ./num_gen/"
                            sh "kubectl apply -f ./static_website/deployment.yaml"
                            sh "kubectl apply -f ./static_website/service.yaml"
                            sh "kubectl apply -f ./nginx/"
                            }
                        }
                }
        }
}
```

Create a second pipeline project to be used for continual deployment.
This will update each time the codebase is pushed to GitGub, please configure your webhook to achieve this.
The updating images script is as below:
```
pipeline{
        agent any
        stages{
                stage('Pull Latest Version'){
                        steps{
                            dir ("/var/jenkins_home/workspace/Group-Project/LAFB-Project"){
                                sh "git pull"
                            }
                        }
                }
                stage('Deploy Application Images'){
                        steps{
                            dir ("/var/jenkins_home/workspace/Group-Project/LAFB-Project"){
                            sh "kubectl apply -f ./mongo"
                            sh "kubectl apply -f ./db_connector/deployment.yaml"
                            sh "kubectl apply -f ./db_connector/service.yaml"
                            sh "kubectl apply -f ./prize_gen_node/deployment.yaml"
                            sh "kubectl apply -f ./prize_gen_node/service.yaml"
                            sh "kubectl apply -f ./notification_server/"
                            sh "kubectl apply -f ./server/"
                            sh "kubectl apply -f ./text_gen/"
                            sh "kubectl apply -f ./num_gen/"
                            sh "kubectl apply -f ./static_website/deployment.yaml"
                            sh "kubectl apply -f ./static_website/service.yaml"
                            sh "kubectl apply -f ./nginx/"
                            }
                        }
                }
         }
}
```

At this point you should be able to go to the below webpage and add users to the database:
http://lackandjucyjenkins.uksouth.cloudapp.azure.com

## Authors

This project was a collaboration by Lucy Shilling and Jack Flanagan (2019).

## Acknowledgments

Thank you to all the staff at LAFB who assisted us with this project.
