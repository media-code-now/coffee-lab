#!/usr/bin/env python3
import argparse
import json
import sys
import urllib.request


def fetch_detail(image_id: str) -> dict:
    url = f"https://api.openverse.org/v1/images/{image_id}/"
    with urllib.request.urlopen(url) as response:
        return json.loads(response.read().decode("utf-8"))


def credit_line(data: dict) -> str:
    title = (data.get("title") or "This work").strip()
    creator = (data.get("creator") or "Unknown").strip()
    license_code = (data.get("license") or "cc-by").upper()
    version = data.get("license_version") or "4.0"
    source = data.get("foreign_landing_url") or ""
    license_url = data.get("license_url") or (
        f"https://creativecommons.org/licenses/{(data.get('license') or 'cc-by')}/{version}/"
    )
    return f"{title} by {creator} - {license_code} {version} - {source} - {license_url}"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("image_id")
    parser.add_argument("--out", help="write JSON to this path")
    parser.add_argument("--print-json", action="store_true")
    parser.add_argument("--print-credit", action="store_true")
    args = parser.parse_args()

    try:
        data = fetch_detail(args.image_id)
    except Exception as exc:
        print(f"Fetch failed - {exc}", file=sys.stderr)
        sys.exit(1)

    if args.out:
        with open(args.out, "w", encoding="utf-8") as file:
            json.dump(data, file, indent=2)
        print(f"Wrote JSON to {args.out}")

    if args.print_json:
        print(json.dumps(data, indent=2))

    if args.print_credit or (not args.print_json and not args.out):
        print(credit_line(data))


if __name__ == "__main__":
    main()
