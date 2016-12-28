const YEAR_REGEX = /(19|20)\d{2}/g;
const CD_NUMBER_REGEX = /cd(\s?)[1-9]/gi;
const SEASON_REGEX = /s(\d{1,2})/i;
const EPISODE_REGEX = /e(\d{1,2})/i;

export function readableDuration(value) {
    // sec = Math.floor(seconds);
    // min = Math.floor(sec / 60);
    // min = min >= 10 ? min : '0' + min;
    // sec = Math.floor(sec % 60);
    // sec = sec >= 10 ? sec : '0' + sec;
    // hh =  Math.floor(min / 60);
    // return hh ? hh + ':' + min : min + ':' + sec;

    var isNegative = false;
    if (isNaN(value)) {
        return value;
    } else if (value < 0) {
        isNegative = true;
        value = Math.abs(value);
    }
    var days = Math.floor(value / 86400);
    value %= 86400;
    var hours = Math.floor(value / 3600);
    value %= 3600;
    var minutes = Math.floor(value / 60);
    var seconds = (value % 60).toFixed(0);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    var res = hours ? (hours + ':' + ('0' + minutes).slice(-2) + ':' + seconds) : (minutes + ':' + seconds);
    if (days) {
        res = days + '.' + res;
    }
    return (isNegative ? ('-' + res) : res);

}



// #CleanTitle
/* Public Methods */
/**
 * Cleans up the specified title
 * @param title            The title to clean
 * @returns {{title: string, year: string, cd: string}}
 */
export function cleanTitle(title) {
    // Cleanup Movie Title
    var cleanTitle = title;
    cleanTitle = this.stripIllegalCharacters(cleanTitle, ' ');
    cleanTitle = cleanTitle.replace(/\bx264|\baac|\bbluray|\bdvd|\bhdtv|\b720p|\b1080p|\b1080i|\b480p|\bWEB-DL|\bmp4|\bmp3|\bogg|\bWEB|DL|UNCENSORED|m3u8|mkv/gi, '');
    cleanTitle = this.removeYearFromTitle(cleanTitle);
    cleanTitle = this.removeReleaseGroupNamesFromTitle(cleanTitle);
    cleanTitle = this.removeMovieTypeFromTitle(cleanTitle);
    cleanTitle = this.removeAudioTypesFromTitle(cleanTitle);
    cleanTitle = this.removeCountryNamesFromTitle(cleanTitle);
    cleanTitle = this.removeCdNumberFromTitle(cleanTitle).trim();
    // Extract CD-Number from Title
    var hasCdinTitle = title.match(CD_NUMBER_REGEX);
    var cd_number = hasCdinTitle ? hasCdinTitle.toString() : '';
    // Extract Year from Title
    var year = title.match(YEAR_REGEX);
    year = year ? year.toString() : '';
    // Extract Season from Title
    const season = cleanTitle.match(SEASON_REGEX);
    cleanTitle = cleanTitle.replace(SEASON_REGEX, '');
    // Extract Season from Title
    const episode = cleanTitle.match(EPISODE_REGEX);
    cleanTitle = cleanTitle.replace(EPISODE_REGEX, '');
    const media = {};
    media.title = cleanTitle;
    media.year = year;
    media.season = season | '';
    media.episode = episode | '';
    media.type = season ? 'tv' : 'movie'
    return media;
}
export function stripIllegalCharacters(movieTitle, replacementString) {
    return movieTitle.replace(/\.|_|\/|\+|\-/g, replacementString);
}
export function removeYearFromTitle(movieTitle) {
    return movieTitle.replace(YEAR_REGEX, "").replace(/\(|\)/g, '');
}
export function removeReleaseGroupNamesFromTitle(movieTitle) {
    return movieTitle.replace(/FxM|aAF|arc|AAC|MLR|AFO|TBFA|WB|JYK|ARAXIAL|UNiVERSAL|ETRG|ToZoon|PFa|SiRiUS|Rets|BestDivX|DIMENSION|CTU|ORENJI|LOL|juggs|NeDiVx|ESPiSE|MiLLENiUM|iMMORTALS|QiM|QuidaM|COCAiN|DOMiNO|JBW|LRC|WPi|NTi|SiNK|HLS|HNR|iKA|LPD|DMT|DvF|IMBT|LMG|DiAMOND|DoNE|D0PE|NEPTUNE|TC|SAPHiRE|PUKKA|FiCO|PAL|aXXo|VoMiT|ViTE|ALLiANCE|mVs|XanaX|FLAiTE|PREVAiL|CAMERA|VH-PROD|BrG|replica|FZERO|YIFY|MarGe|T4P3|MIRCrew|BOKUTOX|NAHOM|BLUWORLD|C0P|TRL|Ozlem|ShAaNiG|800MB|CRiMSON/ig, "");
}
export function removeMovieTypeFromTitle(movieTitle) {
    return movieTitle.replace(/dvdrip|multi9|xxx|x264|x265|AC3|web|hdtv|vhs|HC|embeded|embedded|ac3|dd5 1|m sub|x264|dvd5|dvd9|multi sub|non|h264|x264| sub|subs|ntsc|ingebakken|torrent|torrentz|bluray|brrip|sample|xvid|cam|camrip|wp|workprint|telecine|ppv|ppvrip|scr|screener|dvdscr|bdscr|ddc|R5|telesync|pdvd|1080p|BDRIP|hq|sd|720p|hdrip/gi, "");
}
export function removeAudioTypesFromTitle(movieTitle) {
    return movieTitle.replace(/320kbps|192kbps|128kbps|mp3|320|192|128/gi, "");
}
export function removeCountryNamesFromTitle(movieTitle) {
    return movieTitle.replace(/\b(NL|SWE|SWESUB|ENG|JAP|BRAZIL|TURKIC|slavic|SLK|ITA|HEBREW|HEB|ESP|RUS|DE|german|french|FR|ESPA|dansk|HUN|iTALiAN|JPN|[Ii]ta|[Ee]ng)\b/g, "");
}
export function removeCdNumberFromTitle(movieTitle) {
    return movieTitle.replace(CD_NUMBER_REGEX, "");
}




export function fetchInfo(media) {

}
export function cleanText(text) {
    let parts = text.split("/");
    let rawName = parts[parts.length - 1].split('?')[0];
    return rawName.replace(/[^a-zA-Z0-9]/g, ' ');
}
export function bytesText(bytes) {
    if (bytes < 1024)
        return bytes + " Bytes";
    else if (bytes < 1048576)
        return (bytes / 1024).toFixed(2) + " KB";
    else if (bytes < 1073741824)
        return (bytes / 1048576).toFixed(2) + " MB";
    else
        return (bytes / 1073741824).toFixed(2) + " GB";
}


export function trackers() {
    let trackers = [
        'tr=wss%3A%2F%2Ftracker.webtorrent.io',
        'tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce',
        'tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce',
        'tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce',
        'tr=wss%3A%2F%2Ftracker.btorrent.xyz',
        //'tr=wss%3A%2F%2Ftracker.fastcast.nz',
        'tr=wss%3A%2F%2Ftracker.openwebtorrent.com'
    ]

    return trackers.join('&');
}
