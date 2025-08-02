import streamlit as st
from custom_component import back_camera_input

st.title("🎥 Chụp ảnh với webcam")

img = back_camera_input()

if img:
    st.image(img, caption="Ảnh bạn vừa chụp", use_column_width=True)


