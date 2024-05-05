import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

// グローバルコンテキストを作成
const GlobalContext = createContext();

// グローバルコンテキストのカスタムフックを定義
export const useGlobalContext = () => useContext(GlobalContext);

// グローバルプロバイダコンポーネントを定義
const GlobalProvider = ({ children }) => {
  // ログイン状態、ユーザー情報、ロード状態を管理するステート
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // マウント時にユーザー情報を取得
  useEffect(() => {
      getCurrentUser()
      .then((res) => {
        // ユーザーが取得できた場合
        if(res){
            setIsLoggedIn(true);
            setUser(res);
        } 
        // ユーザーが取得できなかった場合
        else {
            setIsLoggedIn(false);
            setUser(null);
        }
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        // ロード状態を false に設定
        setLoading(false);
    });
  }, []);

  // グローバルコンテキストを提供
  return (
      <GlobalContext.Provider 
          value={{
              isLoggedIn,
              setIsLoggedIn,
              user,
              setUser,
              loading
          }}
        >
            {children}
      </GlobalContext.Provider>
  )
}

export default GlobalProvider