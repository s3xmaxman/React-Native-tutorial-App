import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";

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
const avatars = new Avatars(client);
const databases = new Databases(client);


//ユーザー作成
export const createUser = async(email, password, username) => {
  try {
        const newAccount = await account.create(
          ID.unique(),
          email,
          password,
          username
        );
    
        if (!newAccount) throw Error;
    
        const avatarUrl = avatars.getInitials(username);
    
        await signIn(email, password);
    
      const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email: email,
            username: username,
            avatar: avatarUrl,
        }
      );
    
      return newUser;
    } catch (error) {
        throw new Error(error);
    }
}


//サインイン
export const signIn = async(email, password) => {
  try {
    //   await account.deleteSession('current')
      const session = await account.createEmailSession(email, password);

      return session;
  } catch (error) {
      console.log(error);
      throw new Error(error);
  }
}


//現在のユーザーを取得
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if(!currentAccount) throw new Error;

    const currentUser = await databases.listDocuments(
        config.databaseId, 
        config.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
    );

    if(!currentUser) throw new Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}