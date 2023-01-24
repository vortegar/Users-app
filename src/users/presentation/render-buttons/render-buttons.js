import usersStore from "../../store/users-store";
import { renderTable } from "../render-table/render-table";
import './render-buttons.css'





export const renderButtons = ( element ) => {

    const nextButton = document.createElement('button');
    nextButton.innerText = ' Next > ';

    const prevtButton = document.createElement('button');
    prevtButton.innerText = ' < Prev ';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerText = usersStore.getCurrentPage();

    element.append( prevtButton, currentPageLabel, nextButton );

    nextButton.addEventListener('click', async() => {
        await usersStore.loadNextPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable( element );
    });

    prevtButton.addEventListener('click', async() => {
        await usersStore.loadPreviousPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable( element );
    });
}