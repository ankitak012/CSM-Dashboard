
import logging
from datetime import datetime


# Create a logger specific to this file
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)



# Create a console handler
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)

# Define formatter with milliseconds
formatter = logging.Formatter(
    '%(asctime)s.%(msecs)03d[%(levelname)s]_%(filename)s:%(funcName)s[%(lineno)d] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)


# Apply the formatter to the handler
console_handler.setFormatter(formatter)

# Add the handler only if it's not already added
if not logger.handlers:
    logger.addHandler(console_handler)