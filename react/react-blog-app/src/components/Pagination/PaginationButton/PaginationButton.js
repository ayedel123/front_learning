import "./PaginationButton.css"
import { useState, useEffect, useRef } from "react";

export default function PaginationButton({ props }) {

    const [index, setIndex] = useState(props.index);
    const text = useRef("");;

    useEffect(() => {

        if (props.isSideButton) {
            (index == 1) ? text.current = ">>" : text.current("<<");
        } else {
            text.current = index + 1;
        }
        window.addEventListener("pgButtonPressedEvent", handlePaginationEvent);
        return () => {
            window.removeEventListener("pgButtonPressedEvent", handlePaginationEvent);
        };
    }, []);

    function handlePaginationEvent(event) {
        console.log("Pagination Button Pressed:", event.detail);
        if (props.isSideButton) return;
        console.log(`text:${text.current} + event.detail.offset:${event.detail.offset} = ${parseInt(text.current) + event.detail.offset}`);
        text.current = parseInt(text.current) + event.detail.offset;


    }

    function getNewPageNumber() {

        let newPageNumber = 0;
        if (!props.isSideButton) {
            switch (index) {
                case 0:
                    newPageNumber = (text.current == "1") ? text.current : text.current - 1;
                    break;
                case props.buttonsCount - 1:
                    console.log("Last");
                    newPageNumber = (text.current == props.pagesCount) ? text.current : +text.current + 1;
                    break;
                default:
                    newPageNumber = text.current;
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

    function countOffset(newPageNumber) {
        let offset = 0;
        if (props.isSideButton && index == 0) {
            offset = text.current - index - 1;
        }
        else if (props.isSideButton && index == 1) {
            offset = props.pagesCount - text.current;
        }
        else if (parseInt(text.current) < newPageNumber) {
            offset = 1;
        }
        else if (parseInt(text.current) > newPageNumber) {
            offset = -1;
        }
        console.log("Offset", offset);
        return offset;
    }

    function handleClick() {


        let newPage = getNewPageNumber();
        const pgButtonPressedEvent = new CustomEvent("pgButtonPressedEvent", {

            detail: {
                index: index,
                isSideButton: props.isSideButton,
                offset: countOffset(newPage),
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
            <button onClick={handleClick}>{text.current}</button>
        </div>
    );
}

