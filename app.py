import streamlit as st
from custom_component import back_camera_input

st.title("🎥 Chụp ảnh với webcam")
enable_cam = st.checkbox("Bật Camera")
bt_Capture = st.button("Chụp Ảnh")
if enable_cam:
    img = back_camera_input()
else:
    img = None

if img is not None:
    st.image(img, caption="Ảnh bạn vừa chụp", use_column_width=True)
