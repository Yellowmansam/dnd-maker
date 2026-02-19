from __future__ import annotations

import contextlib
import os
import socket
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import webview


APP_DIR = Path(__file__).resolve().parent


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format: str, *args) -> None:  # noqa: A003
        return


def get_free_port() -> int:
    with contextlib.closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


def main() -> None:
    os.chdir(APP_DIR)
    port = get_free_port()

    handler = partial(QuietHandler, directory=str(APP_DIR))
    server = ThreadingHTTPServer(("127.0.0.1", port), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    try:
        webview.create_window(
            title="D&D 5e Character Builder",
            url=f"http://127.0.0.1:{port}/index.html",
            width=1280,
            height=900,
            min_size=(980, 700),
        )
        webview.start()
    finally:
        server.shutdown()
        server.server_close()


if __name__ == "__main__":
    main()
