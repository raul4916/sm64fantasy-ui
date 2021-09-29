import logo from './logo.svg';
import './App.css';
import './less/main.css'
import './bootstrap-5.1.0-dist/css/bootstrap.css'
import {MainWindow} from "./MainLayout/MainWindow";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {DraftReducer} from "./draft/redux/DraftReducer";
import {UserReducer} from "./login/redux/UserReducer";
import {BrowserRouter} from "react-router-dom";

const rootReducer = combineReducers(
    {draftReduce: DraftReducer, userReduce: UserReducer},
);

function App() {


    const store = createStore(rootReducer, {}, applyMiddleware(thunk));

    return (
        <Provider store={store}>
            <div className="App">
                <MainWindow/>
            </div>
        </Provider>
    );
}

export default App;
export
type State = ReturnType<typeof rootReducer>