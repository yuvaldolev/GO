from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import FileResponse, HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from os import path
from meilisearch import Client

app = FastAPI()

# MeiliSearch client
meili_client = Client("http://meilisearch:7700", "abcaee2d0049fd5eb8839117daffc0e293865030216736477ddeec51d7f3ac3e")

@app.get("/{shortcut}")
async def navigate(shortcut: str):
    results = meili_client.index("shortcuts").search(shortcut)

    for hit in results["hits"]:
        hit_shortcut = hit.get("shortcut")
        hit_url = hit.get("url")
        if (hit.get("shortcut") == shortcut) and (hit.get("url") is not None):
            return RedirectResponse(hit_url)

    raise HTTPException(status_code=404, detail="shortcut not found")

