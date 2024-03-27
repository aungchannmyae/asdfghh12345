import initialRender from "./core/initialRender.js"
import listener from "./core/listener.js";

export default class Shop{
    init(){
        console.log(`Shop start.`)

        initialRender();

        listener();
    }
}