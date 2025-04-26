/**
 * Script qui gère les onglets
 * 
 * @author Maxime Nicol <maxime.nicol@ynov.com>
 * @license MIT
 */

/**
 * Les onglets
 * @type {NodeList}
 */
const tabs = document.querySelectorAll('.tab')

/**
 * Les contenus des onglets
 * @type {NodeList}
 */
const tabContents = document.querySelectorAll(".tab-content")

/**
 * Animation de changement d'onglet
 * @param {Event} e Événement de type "click" sur un onglet
 */
function tabsAnimation(e){

  /**
   * L'index de l'onglet actif
   * @type {Number}
   */
  const indexToRemove = [...tabs].findIndex(tab => tab.classList.contains("active-tab"))

  /**
   * Désactive l'onglet actif
   */
  tabs[indexToRemove].setAttribute("aria-selected", "false")
  tabs[indexToRemove].setAttribute("tabindex", "-1")
  tabs[indexToRemove].classList.remove("active-tab");
  tabContents[indexToRemove].classList.remove("active-tab-content");

  /**
   * L'index de l'onglet ciblé
   * @type {Number}
   */
  const indexToShow = [...tabs].indexOf(e.target)

  /**
   * Active l'onglet ciblé
   */
  tabs[indexToShow].setAttribute("tabindex", "0")
  tabs[indexToShow].setAttribute("aria-selected", "true")
  tabs[indexToShow].classList.add("active-tab")
  tabContents[indexToShow].classList.add("active-tab-content")
}

/**
 * Navigation via les touches flèches
 * @param {Event} e Événement de type "keydown" sur un onglet
 */
function arrowNavigation(e){

  /**
   * L'index de l'onglet actif
   * @type {Number}
   */
  let tabFocus = [...tabs].findIndex(tab => tab === document.activeElement);

  if(e.keyCode === 39 || e.keyCode === 37) {
    tabs[tabFocus].setAttribute("tabindex", -1)

    if(e.keyCode === 39) {
      tabFocus++;

      if(tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else if (e.keyCode === 37) {
      tabFocus--;

      if(tabFocus < 0) {
        tabFocus = tabs.length -1;
      }
    }

    tabs[tabFocus].setAttribute("tabindex", 0)
    tabs[tabFocus].focus()
  }

}

/**
 * Ajout des événements de type "click" sur les onglets
 */
tabs.forEach(tab => tab.addEventListener("click", tabsAnimation))

/**
 * Ajout des événements de type "keydown" sur les onglets
 */
tabs.forEach(tab => tab.addEventListener("keydown", arrowNavigation))

