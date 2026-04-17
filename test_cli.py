#!/usr/bin/env python3

import sys
import os

# Add the udo directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'udo'))

from cli import cli

if __name__ == '__main__':
    cli()
