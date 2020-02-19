import css from "./button.css";

class Button {
    constructor(buttonData) {
        this.buttonData = buttonData;
    }

    render() {
        const buttons = this.buttonData.reduce(
            (result, data, index) =>
                (result += `<button class=${"button" +
                    (index + 1)}>${data}</button>`),
            ""
        );
        return `${buttons}`;
    }
}

export default Button;
