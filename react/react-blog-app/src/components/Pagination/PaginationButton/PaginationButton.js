import "./PaginationButton.css"
import { useState, useEffect, useRef } from "react";

export default function PaginationButton({ props }) {

    const [index, setIndex] = useState(props.index);
    const [text, setText] = useState(index + 1);


    useEffect(() => {

        if (props.isSideButton) {
            (index == 1) ? setText(">>") : setText("<<");
        }
        window.addEventListener("pgButtonPressedEvent", handlePaginationEvent);
        return () => {
            window.removeEventListener("pgButtonPressedEvent", handlePaginationEvent);
        };
    }, []);

    function handlePaginationEvent(event) {
        console.log("Pagination Button Pressed:", event.detail);
        if (props.isSideButton) return;
        if (event.detail.oldText == "<<") {
            setText(text => (index + 1) + "");
        }
        else if (event.detail.oldText == ">>") {
            setText(text => (index + 1 + props.pagesCount - props.buttonsCount) + "");
           
        }
        else if (parseInt(event.detail.oldText) < event.detail.newPageNumber) {
            setText(text => (parseInt(text) + 1) + "");
        }
        else if (parseInt(event.detail.oldText) > event.detail.newPageNumber) {
            setText(text => (parseInt(text) - 1) + "");
        }

    }

    function getNewPageNumber() {

        let newPageNumber = 0;
        if (!props.isSideButton) {
            switch (index) {
                case 0:
                    newPageNumber = (text == "1") ? text : text - 1;
                    break;
                case props.buttonsCount - 1:
                    newPageNumber = (text == props.pagesCount) ? text : +text + 1;
                    break;
                default:
                    newPageNumber = text;
                    break;
            }
        }
        else {
            if (index == 1) {
                newPageNumber = props.pagesCount;
            }
            else
                newPageNumber = 1;
        }
        return newPageNumber;
    }

    function handleClick() {


        let newPage = getNewPageNumber();
        const pgButtonPressedEvent = new CustomEvent("pgButtonPressedEvent", {

            detail: {
                index: index,
                isSideButton: props.isSideButton,
                oldText: text,
                newPageNumber: newPage,
            },
            bubbles: true,
            cancelable: true,
            composed: false,
        });

        window.dispatchEvent(pgButtonPressedEvent);
    }



    return (
        <div className="PaginationButton">
            <button onClick={handleClick}>{text}</button>
        </div>
    );
}

