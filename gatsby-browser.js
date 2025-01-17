import "bootstrap/dist/js/bootstrap.min.js";
import "@popperjs/core/dist/umd/popper.min.js";
import React from 'react'
import Layout from './src/components/layout'
import { Offcanvas } from "bootstrap";

export const wrapPageElement = ({ element, props }) => {
    // props provide same data to Layout as Page element will get
    // including location, data, etc - you don't need to pass it
    return <Layout {...props}>{element}</Layout>
}

export const onRouteUpdate = ({ location, prevLocation }) => {
    if (!prevLocation && !location.hash) {
        // do not restore scroll position on page refresh without hash
        setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 0)
    }
}

export const shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
    window.history.scrollRestoration = 'manual'
    const currentPosition = getSavedScrollPosition(location) || [0, 0]

    setTimeout(() => {
        if (location.hash) {
            // If hash (`/#something`), smooth scroll to that position
            const item = document.querySelector(`${location.hash}`)
            item?.scrollIntoView({ behavior: 'smooth' })
        } else {
            // when using the browser back/forward buttons or navigating to a different page client-side, instant scroll to its last saved position
            window.scrollTo({
                top: currentPosition[1],
                left: currentPosition[0],
                behavior: 'instant',
            })
        }
    }, 0)

    const mobileNavbar = Offcanvas.getOrCreateInstance("#offcanvasDarkNavbar");
    console.log("meow", mobileNavbar);
    if (mobileNavbar) {
        setTimeout(() => {
            mobileNavbar.hide();
            document.querySelectorAll('.offcanvas-backdrop').forEach(e => e.remove());
        }, 10);
    }

    // do not let gatsby do anything more
    return false
}