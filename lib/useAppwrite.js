import { Alert } from "react-native";
import { useEffect, useState } from "react";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  
  const [loading, setLoading] = useState(true);

  // 非同期でデータを取得する関数
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error) {
      // エラーが発生した場合はアラートを表示
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  // コンポーネントがマウントされた時にデータを取得
  useEffect(() => {
    fetchData();
  }, []);

  // データを再取得する関数
  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useAppwrite;