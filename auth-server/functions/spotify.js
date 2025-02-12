import {JSDOM} from 'jsdom';

export async function getSpotifyPreviewUrl(trackId) {
    const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;
        let previewUrl = "";
        const htmlPage = await fetch(embedUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        }).then(response => response.text());
        // const parser = new DOMParser();
        const parser = new JSDOM(htmlPage);
        const doc = parser.window.document;
        const script = doc.querySelector('script[id="__NEXT_DATA__"]');
        if (script) {
        const jsonScript = JSON.parse(script.innerHTML);
        previewUrl = jsonScript.props.pageProps.state.data.entity.audioPreview.url ?? "";
        }
        return previewUrl;
}