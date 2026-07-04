import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';


const mount = (el, { onNavigate, defaultHistory }) => {
    const history = defaultHistory || createMemoryHistory();

    if (onNavigate) {
        history.listen(({ pathname: nextPathname }) => {
            onNavigate({ pathname: nextPathname });
        });
    }

    ReactDOM.render(<App history={history} />, el);

    return {
        onParentNavigate(location) {
            if (history.location.pathname !== location) {
                history.push(location);
            }
        }
    }
}


if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');
    if (devRoot) {
        mount(devRoot, {
            defaultHistory: createBrowserHistory()
        });
    }
}

export { mount };


