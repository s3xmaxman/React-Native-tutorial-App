import { Client, Account } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.s3xmaxman.aora",
    projectId:"6634c856000396a0114c",
    databaseId:"6634cbab0008212a8cc0",
    userCollectionId:"6634cbc100273e914cb9",
    videoCollectionId:"6634cbfc00384c66c839",
    storageId:"6634cd74003a9588acdf"
}



// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform) 


const account = new Account(client);

const createUser = () => {
  account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
      .then(function (response) {
          console.log(response);
      }, function (error) {
          console.log(error);
      });
}