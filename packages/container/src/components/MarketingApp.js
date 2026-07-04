import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp";
import { useHistory } from "react-router-dom";

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const {onParentNavigate} = mount(ref.current, {
            onNavigate: ({ pathname: nextPathname }) => {
                if (history.location.pathname !== nextPathname) {
                    history.push(nextPathname);
                }
            }
        });

        history.listen(({pathname: nextPathname}) => (
            onParentNavigate(nextPathname)
        ));
    }, []);

    return <div ref={ref}></div>
}