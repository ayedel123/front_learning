import { useEffect, useState } from "react";
import "./Pagination.css";
import PaginationButton from "./PaginationButton/PaginationButton";

export default function Pagination({ posts, postsPerPage }) {
    const [buttonsCount, setButtonsCount] = useState(0);
    const [pagesCount, setPagesCount] = useState(0);

    useEffect(() => {

        if (posts == null || posts.length === 0) {
            setButtonsCount(0);
            setPagesCount(0);
        } else {
            setPagesCount(Math.ceil(posts.length / postsPerPage));
            if (pagesCount > 7) { setButtonsCount(7); } else
                setButtonsCount(pagesCount);
        }
        console.log("Pagination: Posts updated", buttonsCount);
    }, [posts, postsPerPage]);

    function createButtons() {
        const buttons = [];
        for (let i = 0; i < buttonsCount; i++) {
            buttons.push(
                <PaginationButton
                    key={i}
                    props={{
                        index: i,
                        isSideButton: false,
                        buttonsCount: buttonsCount,
                        pagesCount: pagesCount,
                    }}

                />
            );
        }
        return buttons;
    }

    return (
        <div className="Pagination">
            <PaginationButton props={{
                index: 0,
                isSideButton: true,
                buttonsCount: buttonsCount,
                pagesCount: pagesCount,
            }} />
            {createButtons()}
            <PaginationButton props={{
                index: 1,
                isSideButton: true,
                buttonsCount: buttonsCount,
                pagesCount: pagesCount,
            }} />
        </div>
    );
}
