import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import './App.css';
import './bootstrap-5.1.0-dist/css/bootstrap.css'
import {DraftReducer} from "./draft/redux/DraftReducer";
import './less/main.css'
import {UserReducer} from "./login/redux/UserReducer";
import {MainWindow} from "./MainLayout/MainWindow";

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