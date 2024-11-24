import "./PaginationButton.css"
import { useState, useEffect, useRef } from "react";

export default function PaginationButton({ props }) {

    const [index, setIndex] = useState(props.index);
    const [isCurrent, setIsCurrent] = useState(props.index == props.currentIndex);
    const [text, setText] = useState(index + 1);


    useEffect(() => {

        if (props.isSideButton) {
            (index == 1) ? setText(">>") : setText("<<");
        }

        const handlePaginationEvent = function (event) {
            let tmpText = text;
            if (props.isSideButton) return;
            if (event.detail.oldText == "<<") {
                tmpText = (index + 1) + "";
            }
            else if (event.detail.oldText == ">>") {
                tmpText = (index + 1 + props.pagesCount - props.buttonsCount) + "";
            }
            else if (parseInt(event.detail.oldText) < event.detail.newPageNumber) {
                tmpText = (parseInt(tmpText) + 1) + "";
            }
            else if (parseInt(event.detail.oldText) > event.detail.newPageNumber) {
    
                tmpText = (parseInt(tmpText) - 1) + "";
            }
    
            setText(text => {
                return tmpText;
            });
    
            setIsCurrent(isCurrent => {
                return tmpText == event.detail.newPageNumber;
            });
        }


        window.addEventListener("pgButtonPressedEvent", handlePaginationEvent);
        return () => {
            window.removeEventListener("pgButtonPressedEvent", handlePaginationEvent);
        };
    }, [text]);

    

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
            {isCurrent ? (<button className="CurrnetPaginationButton" onClick={handleClick}>{text}</button>) : (<button onClick={handleClick}>{text}</button>)}


        </div>
    );
}
