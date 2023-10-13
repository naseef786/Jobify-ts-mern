

//importing card image

import dash from "../../../public/bg_dashboard.png"; 
import ideas from "../../../public/bg_ideas.png";
import join from "../../../public/bg_join.png";
import create from "../../../public/bg_create.png";
import search from "../../../public/bg_search.png";


const Backgrounds = [
    {
        id: 1,   // this is the unique id
        title: "Dashboard",  //Title to show on card
        type: "dashboard", //Type will help us to show different cards
        description: "ReactPlay is an OpenSource to Learn, Create, and Share ReactJS Projects",  //This is the description to show
        statement: "Know More", //This is the content to show on the button
        image: dash, // Image you want to show on the card
        url: "https://reactplay.io/" 
    },
    {
        id: 2,
        title: "Ideas",
        type: "ideas",
        description: "Looking for project ideas to practice React? Great, click down below for some ideas to get you started.",
        statement: "Get Ideas",
        image: ideas,
        url: "https://reactplay.io/ideas",
    },
    {
        id: 3,
        title: "Join",
        type: "join",
        description: "Join us on Twitter and be a part of ReactPlay Community",
        statement: "Join Now",
        image: join,
        url: "https://twitter.com/reactplayio",
    },
    {
        id: 4,
        title: "Build",
        type: "build",
        description: "Ready to create a new play? It is super easy, click down below to get started.",
        statement: "Create Now",
        image: create,
        url: "https://github.com/reactplay/react-play/blob/main/CREATE-PLAY.md"
    },
    {
        id: 5,
        title: "Search",
        type: "search",
        description: "Start browsing the plays built by our community developers.",
        statement: "Browse Now",
        image: search,
        url: "https://reactplay.io/plays"
    },
]
export default Backgrounds;   //exporting backgrounds.js
