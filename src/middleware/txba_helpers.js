import axios from "axios";
// import Vue from "vue";

const cheerio = require("cheerio");

export default class TXBA_Utilities {
  constructor() {
    this.baseURL = "https://texasbluesalley.com/proplayer74-tony/";
    this.default_entries_slug = "--ajax-browser-default-entries";
    this.notification_slug = "--ajax-load-default-page";
    this.favorites_slug = "--ajax-load-favorites-list";
    this.filter_slug = "--ajax-browser-filters";
    this.package_slug = "--ajax-get-package-info";
    this.search_slug = "--ajax-browser-search-entries";
    this.user_loops_slug = "--ajax-get-segment-user-loops";
    this.segment_slug = "--ajax-get-segment-info";
    this.load_media_slug = "--ajax-load-media";
    this.load_vimeo_slug = "/--ajax-load-media/vimeo/";
    this.slug_code = {
      pro_player_packages:
        "wcm9fcGxheWVyX3BhY2thZ2VzXC8iLCJjaGFubmVsIjoicHJvX3BsYXllcl9wYWNrYWdlcyJ9",
      free_lesson_friday:
        "mcmVlX2xlc3Nvbl9mcmlkYXlcLyIsImNoYW5uZWwiOiJmcmVlX2xlc3Nvbl9mcmlkYXkifQ",
      tone_tuesday: "0b25lX3R1ZXNkYXlcLyIsImNoYW5uZWwiOiJ0b25lX3R1ZXNkYXkifQ",
      performances: "wZXJmb3JtYW5jZXNcLyIsImNoYW5uZWwiOiJwZXJmb3JtYW5jZXMifQ",
      backing_tracks:
        "iYWNraW5nX3RyYWNrc1wvIiwiY2hhbm5lbCI6ImJhY2tpbmdfdHJhY2tzIn0",
      youtube_videos:
        "5b3V0dWJlX3ZpZGVvc1wvIiwiY2hhbm5lbCI6InlvdXR1YmVfdmlkZW9zIn0"
    };
    this.favs = {};
  }

  async getAsyncData(slug, callback) {
    try {
      const url = `${this.baseURL}${slug}`;
      const response = await axios
        .get(url)
        .then(async response => await response.data);
      return callback ? callback.call(this, response) : response;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
  getFavs() {
    return this.getAsyncData(this.favorites_slug, this.parseFavoriteHtml);
  }

  getNotification() {
    return this.getAsyncData(
      this.notification_slug,
      this.parseNotificationHtml
    );
  }

  getUserLoops(segID) {
    const slug = `${this.user_loops_slug}/${segID}`;
    return this.getAsyncData(slug);
  }

  getDefaultSearchEntries() {
    return this.getAsyncData(
      this.default_entries_slug,
      this.parseSearchResults
    );
  }

  async getSearchFiltersByCategory(code) {
    code = code === "pro_player_packages" ? "courses" : code;
    const url = `${this.baseURL}${this.filter_slug}/${code}`;
    // console.log(url)
    return await axios
      .get(url)
      .then(async response => await response.data)
      .then(response => this.parseCriteria(response));
  }

  async getPackage(ID) {
    // console.log('id', ID)
    if (!ID) return ID;
    const response = await axios.get(
      `${this.baseURL}${this.package_slug}/${ID}`
    );
    let pkg = await await response.data;
    pkg.playSections = this.parseSections(pkg.sections, pkg.packageImage);
    // console.log("pack", pkg);
    return pkg;
  }

  async getSegment(ID) {
    const slug = `${this.segment_slug}/${ID}`;
    const seg = await this.getAsyncData(slug);
    console.log("retr Seg", seg);
    return seg;
  }

  parseSections(sections, poster) {
    const newSections = [];
    sections.forEach(section => {
      // remove unnecessary segment entries (= "")
      const testSegments = section.segments.map(segment => {
        return Object.entries(segment).reduce((relevant, [k, v]) => {
          if (v !== "") relevant[k] = v;
          return relevant;
        }, {});
      });

      // filter segs without Filename or Code in the keys
      const segments = testSegments.filter(segment =>
        Object.keys(segment).some(function(k) {
          return ~k.indexOf("Filename") || ~k.indexOf("Code");
        })
      );
      const newSection = {
        sectionTitle: section.sectionTitle,
        sectionID: section.sectionID,
        segments: segments.map(seg => {
          let segData = this.parseSegmentData(seg);
          let tmp = {
            title: seg.segmentTitle,
            id: seg.segmentID,
            poster: poster
          };
          let whole = Object.assign({}, tmp, segData);
          // console.log('compare', tmp, whole)
          return whole;
        })
      };

      newSections.push(newSection);
    });
    return newSections;
  }

  parseSegmentData(seg) {
    let type = {};
    const yt_slug = "https://www.youtube.com/watch?v=";

    if (this.objectHaveKeyLike(seg, "Vimeo"))
      type = {
        to: `vimeo/${seg.segmentID}`,
        type: "video/vimeo",
        src: seg.segmentVimeoCode,
        color: "orange"
      };
    if (this.objectHaveKeyLike(seg, "YouTube"))
      type = {
        to: `youtube/${seg.segmentID}`,
        type: "video/youtube",
        src: `${yt_slug}${seg.segmentYouTubeCode}&html5=true`,
        color: "red"
      };
    if (this.objectHaveKeyLike(seg, "MP3"))
      type = {
        to: seg.segmentID,
        // sources: [
        //   {
        type: "audio/mp3",
        src: `https://cdn.texasbluesalley.com/audio/${seg.segmentMP3Filename}`,
        //   }
        // ],
        color: "teal"
      };
    if (this.objectHaveKeyLike(seg, "SoundSlice"))
      type = {
        to: `soundslice/${seg.segmentID}`,
        // sources: [
        //   {
        src: seg.segmentSoundSliceCode,
        type: "soundslice",
        //   }
        // ],
        color: "orange"
      };
    if (this.objectHaveKeyLike(seg, "PDF"))
      type = {
        to: `pdf/${seg.segmentID}`,
        // sources: [
        //   {
        src: seg.segmentPDFCode,
        type: "pdf",
        //   }
        // ],
        color: "yellow"
      };
    if (this.objectHaveKeyLike(seg, "GPX"))
      type = {
        to: `soundslice/${seg.segmentID}`,
        // sources: [
        //   {
        type: "application/gpx+xml",
        src: seg.segmentGPXFilename,
        //   }
        // ],
        color: "purple"
      };

    return type;
  }

  parseIdx(clickString) {
    clickString = clickString.replace(/'/g, '"');
    const pkg = JSON.parse(clickString.match(/\{([^}]+)\}/g));
    pkg.packageID = parseInt(pkg.packageID);
    return pkg;
  }

  parseFavoriteHtml(html) {
    const mockHtml = this.fakeFavHTML();
    const $ = cheerio.load(html);
    const favHtml = $(".accordion-title");
    return this.parseFavoriteData(favHtml.length > 0 ? favHtml : mockHtml);
  }

  parseFavoriteData(group) {
    const $ = cheerio.load(group.html());
    group.each((idx, e) => {
      let title = $(e)
        .text()
        .split(" ")[0]
        .trim();
      this.favs[title] = [];
      let items = $(e)
        .parent()
        .find(".sidebar-list li");
      items.each((index, val) => {
        // console.log("val", $(val).find(".sidebar-list-item-link").text())
        const itm = {
          id: $(val)
            .find("form")
            .data("id"),
          title: $(val)
            .find(".sidebar-list-item-link")
            .text()
        };
        // console.log("item", itm);
        this.favs[title].push({ ...itm });
      });
    });
    return this.favs;
  }

  parseNotificationHtml(html) {
    const $ = cheerio.load(html);
    let announcements = $("#announcements li");

    let updates = $("#course-updates li.notification");
    announcements = announcements.length
      ? this.parseNotificationData(announcements)
      : [];
    updates = updates.length ? this.parseNotificationData(updates) : [];

    // console.log("notes", announcements, updates);
    return {
      announcements: announcements,
      updates: updates
    };
  }

  parseNotificationData(group) {
    // console.log(group);
    const html = group.html();
    // console.log("html", html);
    const $ = cheerio.load(html);
    let collection = [];
    group.each((idx, e) => {
      const itm = {
        id: idx,
        title: $(e)
          .find(".notification-title span")
          .text(),
        subtitle: $(e)
          .find(".notification-body p")
          .text(),
        actionText: $(e)
          .find(".notification-body a")
          .text(),
        action: $(e)
          .find(".notification-body a")
          .attr("href")
      };
      collection.push({ ...itm });
    });
    // console.log("col", collection);
    return collection;
  }

  async parseSearchResults(html) {
    const $ = cheerio.load(html);
    return this.parseSearchFilters($("div[id^=browserResultItem]"));
  }

  parseSearchFilters(group) {
    // console.log("gfi:group", group)
    const html = group.html();
    // console.log("html", html)
    const $ = cheerio.load(html);
    let collection = [];
    group.each((idx, e) => {
      const pkg = this.parseIdx(
        $(e)
          .find(".browser-result-image a")
          .attr("onclick")
      );
      const fave = this.isFav(pkg.packageID);
      // console.log("fave", fave);
      const itm = {
        id: pkg.packageID,
        type: pkg.type,
        favColor: !fave ? "grey" : "pink",
        avatar: $(e)
          .find("img")
          .attr("src"),
        title: $(e)
          .find(".browser-result-title a")
          .text(),
        subtitle: $(e)
          .find(".browser-result-description")
          .text(),
        data: $(e)
          .find(".browser-result-meta")
          .html()
      };
      // if (itm.favColor == "pink")
      //  console.log("item",itm);
      collection.push({ ...itm });
    });
    // console.log("col", collection);
    return collection;
  }

  parseCriteria(html) {
    const $ = cheerio.load(html);
    let hiddenFields = this.parseHiddenData($(".hiddenFields input"));
    // console.log(hiddenFields)
    let funnelList = this.parseFunnels($(".filter-list"));
    // console.log(funnelList)

    return {
      auth: hiddenFields,
      funnels: funnelList
    };
  }

  parseHiddenData(group) {
    // console.log("grp", group)
    const $ = cheerio.load(group.html());
    const collection = {};
    group.each((idx, e) => {
      collection[$(e).attr("name")] = $(e).attr("value");
    });
    return collection;
  }

  parseFunnels(group) {
    // console.log('group', group)
    const $ = cheerio.load(group.html());
    const collection = {};
    group.each((idx, e) => {
      const section = $(e).data();
      collection[section.sectionId] = section;
      collection[section.sectionId]["tags"] = [];
      collection[section.sectionId]["chips"] = [];
      $(e)
        .find(".filter-checkbox")
        .each((i, itm) => {
          const chip = {
            id: itm.attribs.id,
            name: itm.attribs.name,
            value: itm.attribs.value,
            text: $(itm)
              .next()
              .text()
          };
          collection[section.sectionId]["chips"].push(chip);
          collection[section.sectionId]["tags"].push(chip.text);
        });
    });
    return collection;
  }

  isFav(packageID) {
    var found = false;
    var foundException = {};
    try {
      Object.entries(this.favs).forEach(key => {
        const result = key[1].filter(({ id }) => id === packageID);
        found = typeof result[0] === "object";
        if (found) throw foundException;
      });
    } catch (error) {
      if (error !== foundException) throw foundException;
    }

    return found;
  }
  objectHaveKeyLike(obj, testString) {
    return Object.keys(obj).some(key => {
      return ~key.indexOf(testString);
    });
  }

  fakeFavHTML() {
    //#region

    const favhtml = `
  <ul class="accordion sidebar-accordion" id="favoritesListAccordion" data-accordion data-allow-all-closed="true" data-multi-expand="false">



          <li class="accordion-item is-active" data-accordion-item>
            <a class="accordion-title">Courses <sup>12</sup></a>
            <div class="accordion-content" data-tab-content>
              <ul class="sidebar-list">



                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('4254', true); return false;">Silent Night</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4254" data-id="4254" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046195" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('7766', true); return false;">Clapton&#8217;s Influence: Worried Mind</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-7766" data-id="7766" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046196" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('5527', true); return false;">Clapton&#8217;s Influence: Old Flame</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-5527" data-id="5527" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046197" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('4259', true); return false;">Thanksgiving Ballad 2016 Quick Fix</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4259" data-id="4259" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046198" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('4272', true); return false;">Thanksgiving Ballad 2014</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4272" data-id="4272" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046199" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('4296', true); return false;">Covenant</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4296" data-id="4296" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046200" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('4850', true); return false;">Texas Flood Relief 2017</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4850" data-id="4850" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046201" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('5285', true); return false;">Clapton&#8217;s Influence: Crossroad Blues w/Bonus</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-5285" data-id="5285" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046202" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('4304', true); return false;">5 Essential Blues Boxes</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4304" data-id="4304" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046203" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('4250', true); return false;">Essential Fretboard</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4250" data-id="4250" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046204" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('4300', true); return false;">The Grip</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4300" data-id="4300" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046205" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('4252', true); return false;">Texas Blues Speed Workshop - Level 2</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-4252" data-id="4252" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046206" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>

              </ul>
            </div>
          </li>







          <li class="accordion-item " data-accordion-item>
            <a class="accordion-title">Imported	 <sup>23</sup></a>
            <div class="accordion-content" data-tab-content>
              <ul class="sidebar-list">

                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('8054', true); return false;">Sleepwalk - Bass cover</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-8054" data-id="8054" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046207" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('7949', true); return false;">Get Deep with some Funky Texas Style Acoustic Blues | Tuesday Blues 126</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-7949" data-id="7949" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046208" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('7953', true); return false;">How To Play Billy Strings' Dust In A Baggie - Advanced Bluegrass Guitar Lesson</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-7953" data-id="7953" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046209" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('7959', true); return false;">Sleepwalk Bass Tutorial</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-7959" data-id="7959" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046210" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('7863', true); return false;">Wish You Were Here Guitar Lesson - Pink Floyd Complete Guitar Tutorial |Chords + Solos + TAB|</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-7863" data-id="7863" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046211" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6387', true); return false;">how to play &quot;Over the Hills and Far Away&quot; on guitar by &quot;Led Zeppelin&quot; - acoustic guitar lesson</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6387" data-id="6387" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046212" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('7147', true); return false;">The Black Keys Thickfreakness Guitar Lesson</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-7147" data-id="7147" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046213" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('7155', true); return false;">30 Hot Rod Guitar Licks - #4 Hot Rod - Bill Kirchen</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-7155" data-id="7155" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046214" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6964', true); return false;">Man of Constant Sorrow | Guitar Lesson Tutorial</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6964" data-id="6964" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046215" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6907', true); return false;">ZZ Top - Jesus Just Left Chicago (Bass cover with tabs)</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6907" data-id="6907" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046216" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6796', true); return false;">Kelly Valleau - Havana (Camila Cabello) - Fingerstyle Guitar</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6796" data-id="6796" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046217" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6777', true); return false;">Darren Watson | FREE BLUES GUITAR LESSON | Delta Blues Fingerstyle Lesson</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6777" data-id="6777" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046218" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6610', true); return false;">How to play Have you ever Seen the Rain - Creedence Clearwater Revival / GuiTabs Guitar Lesson</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6610" data-id="6610" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046219" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6605', true); return false;">Jimmy Brown show us how to play Led Zepplin Immigrant Song</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6605" data-id="6605" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046220" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6521', true); return false;">how to play Angie on guitar by the Rolling Stones - acoustic guitar lesson_tutorial</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6521" data-id="6521" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046221" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6549', true); return false;">The Easiest Blues on Acoustic Guitar | Beginner Friendly</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6549" data-id="6549" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046222" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6522', true); return false;">John Mayer Gives Blues Guitar Lesson (2018)</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6522" data-id="6522" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046223" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6552', true); return false;">Patience  - Guns N Roses / MusikMan #056</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6552" data-id="6552" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046224" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6547', true); return false;">Blues BASS LESSON with TAB - 12 Bar Bass Lines in A (including Turnarounds)</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6547" data-id="6547" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046225" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6350', true); return false;">Cornell Dupree Hot Licks Full VHS</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6350" data-id="6350" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046226" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6349', true); return false;">Ghost Riders in the Sky: Guitar Cover, The Outlaws, Full Song</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6349" data-id="6349" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046227" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6371', true); return false;">Lil Nas X - Old Town Road ft. Billy Ray Cyrus [Remix Instrumental]</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6371" data-id="6371" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046228" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>





                <li class="sidebar-list-item button play ">
                  <a class="sidebar-list-item-link" onClick="thePlayer.openPackage('6159', true); return false;">50 Texas Blues Licks - #19 Double Stop Lenny - Guitar Lesson - Corey Congilio</a>

                    <form action="https://texasbluesalley.com/?ACT=330" accept-charset="utf-8" id="submitFavorite-6159" data-id="6159" data-action="remove" class="submitFavoriteForm" method="post"><div style="display:none">
<input type="hidden" name="params_id" value="5046229" />
</div>
                        <input type="hidden" name="delete" value="yes" />
                        <a class="sidebar-list-item-button delete-button" onClick="thePlayer.favoritesManager.removeFavoriteFromList(this); return false;"></a>
                    </form>

                </li>



              </ul>
            </div>
          </li>









  </ul>
<script type="text/javascript">
  $(function() {$('#favoritesListAccordion').foundation();});
</script>


`;
    //#endregion
    const $ = cheerio.load(favhtml);
    const mockHtml = $(".accordion-title");
    return mockHtml;
  }
}
