import axios from "axios";
// import Vue from 'vue';

const cheerio = require('cheerio');

class FavUtils {
    constructor() {
        this.favs = this.getFavs();
        return this.favs;
    }

    getFavs() {
        // "https://texasbluesalley.com/proplayer74-tony/--ajax-load-favorites-list"
        return this.parseFavoriteHtml(this.fakeFavHTML());
    }

    async parseFavoriteHtml(html) {
        return await new Promise((resolve, reject) => {
            try {
                const cheerio = require("cheerio");
                const $ = cheerio.load(html);
                resolve(this.parseFavoriteData($(".accordion-title")));
            } catch (error) {
                reject(error);
            }
        });
    }

    parseFavoriteData(group) {
        const cheerio = require("cheerio");
        const $ = cheerio.load(group.html());
        let favOBJ = { favs: {} };

        group.each((idx, e) => {
            let title = $(e).text().split(" ")[0];
            favOBJ.favs[title] = [];
            let items = $(e).parent().find(".sidebar-list li");
            items.each((index, val) => {
                // console.log('val', $(val).find('.sidebar-list-item-link').text())
                const itm = {
                    id: $(val).find("form").data("id"),
                    title: $(val).find(".sidebar-list-item-link").text(),
                    //subtitle: $(e).find(".notification-body p").text(),
                };
                // console.log('item', itm);
                favOBJ.favs[title].push({ ...itm });
            });
        });
        // console.log('obj', favOBJ)
        return favOBJ;
    }

    fakeFavHTML() {
        //#region
        return `<ul class="accordion sidebar-accordion" id="favoritesListAccordion" data-accordion data-allow-all-closed="true"
    data-multi-expand="false">



    <li class="accordion-item is-active" data-accordion-item>
        <a class="accordion-title">Courses <sup>10</sup></a>
        <div class="accordion-content" data-tab-content>
            <ul class="sidebar-list">



                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link"
                        onClick="thePlayer.openPackage('5527', true); return false;">Clapton&#8217;s Influence: Old
                        Flame</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-5527"
                        data-id="5527" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795126" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link"
                        onClick="thePlayer.openPackage('4259', true); return false;">Thanksgiving Ballad 2016 Quick
                        Fix</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4259"
                        data-id="4259" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795127" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link"
                        onClick="thePlayer.openPackage('4272', true); return false;">Thanksgiving Ballad 2014</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4272"
                        data-id="4272" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795128" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link"
                        onClick="thePlayer.openPackage('4296', true); return false;">Covenant</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4296"
                        data-id="4296" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795129" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('4850', true); return false;">Texas
                        Flood Relief 2017</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4850"
                        data-id="4850" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795130" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link"
                        onClick="thePlayer.openPackage('5285', true); return false;">Clapton&#8217;s Influence:
                        Crossroad Blues w/Bonus</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-5285"
                        data-id="5285" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795131" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('4304', true); return false;">5
                        Essential Blues Boxes</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4304"
                        data-id="4304" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795132" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link"
                        onClick="thePlayer.openPackage('4250', true); return false;">Essential Fretboard</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4250"
                        data-id="4250" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795133" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('4300', true); return false;">The
                        Grip</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4300"
                        data-id="4300" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795134" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('4252', true); return false;">Texas
                        Blues Speed Workshop - Level 2</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4252"
                        data-id="4252" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795135" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>

            </ul>
        </div>
    </li>







    <li class="accordion-item " data-accordion-item>
        <a class="accordion-title">Imported <sup>23</sup></a>
        <div class="accordion-content" data-tab-content>
            <ul class="sidebar-list">

                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link"
                        onClick="thePlayer.openPackage('8054', true); return false;">Sleepwalk - Bass cover</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-8054"
                        data-id="8054" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795136" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('7949', true); return false;">Get
                        Deep with some Funky Texas Style Acoustic Blues | Tuesday Blues 126</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-7949"
                        data-id="7949" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795137" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('7953', true); return false;">How
                        To Play Billy Strings' Dust In A Baggie - Advanced Bluegrass Guitar Lesson</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-7953"
                        data-id="7953" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795138" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link"
                        onClick="thePlayer.openPackage('7959', true); return false;">Sleepwalk Bass Tutorial</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-7959"
                        data-id="7959" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795139" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('7863', true); return false;">Wish
                        You Were Here Guitar Lesson - Pink Floyd Complete Guitar Tutorial |Chords + Solos + TAB|</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-7863"
                        data-id="7863" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795140" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6387', true); return false;">how
                        to play &quot;Over the Hills and Far Away&quot; on guitar by &quot;Led Zeppelin&quot; - acoustic
                        guitar lesson</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6387"
                        data-id="6387" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795141" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('7147', true); return false;">The
                        Black Keys Thickfreakness Guitar Lesson</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-7147"
                        data-id="7147" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795142" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('7155', true); return false;">30
                        Hot Rod Guitar Licks - #4 Hot Rod - Bill Kirchen</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-7155"
                        data-id="7155" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795143" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6964', true); return false;">Man
                        of Constant Sorrow | Guitar Lesson Tutorial</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6964"
                        data-id="6964" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795144" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6907', true); return false;">ZZ
                        Top - Jesus Just Left Chicago (Bass cover with tabs)</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6907"
                        data-id="6907" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795145" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6796', true); return false;">Kelly
                        Valleau - Havana (Camila Cabello) - Fingerstyle Guitar</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6796"
                        data-id="6796" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795146" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link"
                        onClick="thePlayer.openPackage('6777', true); return false;">Darren Watson | FREE BLUES GUITAR
                        LESSON | Delta Blues Fingerstyle Lesson</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6777"
                        data-id="6777" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795147" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6610', true); return false;">How
                        to play Have you ever Seen the Rain - Creedence Clearwater Revival / GuiTabs Guitar Lesson</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6610"
                        data-id="6610" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795148" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6605', true); return false;">Jimmy
                        Brown show us how to play Led Zepplin Immigrant Song</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6605"
                        data-id="6605" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795149" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6521', true); return false;">how
                        to play Angie on guitar by the Rolling Stones - acoustic guitar lesson_tutorial</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6521"
                        data-id="6521" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795150" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6549', true); return false;">The
                        Easiest Blues on Acoustic Guitar | Beginner Friendly</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6549"
                        data-id="6549" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795151" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6522', true); return false;">John
                        Mayer Gives Blues Guitar Lesson (2018)</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6522"
                        data-id="6522" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795152" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link"
                        onClick="thePlayer.openPackage('6552', true); return false;">Patience - Guns N Roses / MusikMan
                        #056</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6552"
                        data-id="6552" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795153" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6547', true); return false;">Blues
                        BASS LESSON with TAB - 12 Bar Bass Lines in A (including Turnarounds)</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6547"
                        data-id="6547" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795154" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link"
                        onClick="thePlayer.openPackage('6350', true); return false;">Cornell Dupree Hot Licks Full
                        VHS</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6350"
                        data-id="6350" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795155" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6349', true); return false;">Ghost
                        Riders in the Sky: Guitar Cover, The Outlaws, Full Song</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6349"
                        data-id="6349" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795156" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6371', true); return false;">Lil
                        Nas X - Old Town Road ft. Billy Ray Cyrus [Remix Instrumental]</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6371"
                        data-id="6371" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795157" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                    <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6159', true); return false;">50
                        Texas Blues Licks - #19 Double Stop Lenny - Guitar Lesson - Corey Congilio</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6159"
                        data-id="6159" data-action="remove" class="submitFavoriteForm" method="post">
                        <div style="display:none">
                            <input type="hidden" name="params_id" value="4795158" />
                        </div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button"
                            onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>
                </li>
            </ul>
        </div>
    </li>
</ul>`;
        //#endregion
    }
}

class NoteUtils {
    constructor() {
        this.notification = this.getNotification();
        return this.notification;
    }

    async getNotification() {
        try {
            const responseonse = await axios.get(
                "https://texasbluesalley.com/proplayer74-tony/--ajax-load-default-page"
            );
            return this.parseNotificationHtml(responseonse.data);
        } catch (error) {
            console.error(error);
        }
    }

    parseNotificationHtml(html) {
        // console.log(html)
        const cheerio = require("cheerio");
        const $ = cheerio.load(html);
        // console.log('ann', $("#announcements li"))
        return {
            announcements: this.parseNotificationData($, $("#announcements li")),
            updates: this.parseNotificationData(
                $,
                $("#course-updates li.notification")
            ),
        };
    }

    parseNotificationData($, group) {
        // console.log(group)
        let collection = [];
        group.each((idx, e) => {
            const itm = {
                id: idx,
                title: $(e).find(".notification-title span").text(),
                subtitle: $(e).find(".notification-body p").text(),
                actionText: $(e).find(".notification-body a").text(),
                action: $(e).find(".notification-body a").attr("href"),
            };
            collection.push({ ...itm });
        });
        // console.log("col", collection);
        return collection;
    }
}

class BrowserResults {
    constructor() {
        this.baseURL = "https://texasbluesalley.com/proplayer74-tony/";
        this.default_entries_slug = "--ajax-browser-default-entries";
        return this.getDefaults()
    }
    getDefaults() {
        const url = `${this.baseURL}${this.default_entries_slug}`;
        return axios
            .get(url)
            .then(async (response) => {
                return await this.parseHtml(response.data);
            });
    }
    getFilteredByCode(code) {
        axios
            .get(`${this.baseURL}--ajax-browser-filters/${code}`)
            .then((response) => this.parseHtml(response.data));
    }
    async parseHtml(html, mode) {
        mode = typeof mode === "undefined" ? "default" : mode;
        // const cheerio = require("cheerio");
        const $ = cheerio.load(html);
        // console.log('html',html);
        return this.getInfo(
            $,
            $("div[id^=browserResultItem]"),
            mode
        );
        // console.log(html);
        // console.dir()
    }
    getInfo($, group, mode) {
        let collection = [];
        switch (mode) {
            case " ":
                break;

            default:
                group.each((idx, e) => {
                    const pkg = this.getIdx(
                        $(e).find(".browser-result-image a").attr("onclick")
                    );
                    const itm = {
                        id: pkg.packageID,
                        type: pkg.type,
                        isFav: false,
                        avatar: "http:" + $(e).find("img").attr("src"),
                        title: $(e).find(".browser-result-title a").text(),
                        subtitle: $(e).find(".notification-body p").text(),
                        data: $(e).find(".browser-result-meta").html(),
                    };
                    // console.log();
                    collection.push({ ...itm });
                });
                break;
        }
        // console.log("col", collection);
        return collection;
    }
    getIdx(clickString) {
        clickString = clickString.replace(/'/g, '"');
        const pkg = JSON.parse(clickString.match(/\{([^}]+)\}/g));
        pkg.packageID = parseInt(pkg.packageID);
        return pkg;
    }
}

class SearchUtils {
    constructor() {
        this.baseURL = "https://texasbluesalley.com/proplayer74-tony/";
        this.courses_slug = "--ajax-browser-filters/courses";
        return this.getCourses();
    }
    async getCourses() {
        return axios.get(`${this.baseURL}${this.courses_slug}`)
            .then(async (response) => await response.data)
            .then(response => this.parseCoursesCriteria(response))
    }
    parseCoursesCriteria(html) {
        const $ = cheerio.load(html)
        let hiddenFields = this.parseHiddenData($('.hiddenFields input'));
        let acc1 = this.parseFunnels($('.filter-list'));
        // console.log(acc1)

        return {
            auth: hiddenFields,
            funnels: acc1
        };
    }
    parseHiddenData(group) {
        const $ = cheerio.load(group.html())
        const collection = {};
        group.each((idx, e) => {
            collection[$(e).attr('name')] = $(e).attr('value')
        })
        return collection;
    }
    parseFunnels(group) {
        // console.log('group', group)
        const $ = cheerio.load(group.html())
        const collection = {};
        group.each((idx, e) => {
            const section = $(e).data()
            collection[section.sectionId] = section;
            collection[section.sectionId]['tags'] = [];
            collection[section.sectionId]['chips'] = [];
            $(e).find('.filter-checkbox').each((i, itm) => {
                const chip = {
                    id: itm.id,
                    name: itm.name,
                    value: itm.value,
                    text: $(itm).next().text()
                };
                collection[section.sectionId]['chips'].push(chip)
                collection[section.sectionId]['tags'].push(chip.text);
            })
        })
        return collection;
    }
}

export default { NoteUtils, FavUtils, BrowserResults, SearchUtils };
