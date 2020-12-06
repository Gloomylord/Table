import React, {useCallback, useState} from 'react';
import {nanoid} from 'nanoid';
import CustomTable from "./components/CustomTable";
import Loader from "./components/Loader";
import './App.css';

function App() {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const load = async function load(url: string) {
        try {
            const response = await fetch(url);
            let data = await response.json();
            data = data.map((item: any) => ({...item, keyId: nanoid()}));
            setData(data);
        } catch (e) {
            alert('Ошибка сети');
        } finally {
            setLoading(false);
        }
    };

    const loadData = useCallback(() => {
        setLoading(true);
        load('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}');
    }, []);

    const loadBigData = useCallback(() => {
        setLoading(true);
        load('http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}');
    }, []);

    const addDataElement = useCallback((element) => {
        setData([element, ...data]);
    }, []);

    return (
        <div className="App">
            {loading && <Loader/>}
            {data.length > 0 && <CustomTable addElement={addDataElement} rows={data}/>}
            {data.length === 0 && (
                <div className='buttons'>
                    <button
                        className='btn_load'
                        onClick={loadData}
                        disabled={loading}
                    >
                        Загрузить немного
                    </button>
                    <button
                        className='btn_load'
                        onClick={loadBigData}
                        disabled={loading}
                    >
                        Загрузить много
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
