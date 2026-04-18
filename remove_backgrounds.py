import os
import sys
from rembg import remove
from PIL import Image

def process_image(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        input_img = Image.open(input_path)
        output_img = remove(input_img)
        output_img.save(output_path)
        print(f"Saved to {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == '__main__':
    images = [
        (r'C:\Users\Admin\.gemini\antigravity\brain\adedcd80-e4ea-4c67-8a14-54881369efa0\hero_soldier_1776499664960.png', 'hero_soldier.png'),
        (r'C:\Users\Admin\.gemini\antigravity\brain\adedcd80-e4ea-4c67-8a14-54881369efa0\police_action_1776499682723.png', 'police_action.png'),
        (r'C:\Users\Admin\.gemini\antigravity\brain\adedcd80-e4ea-4c67-8a14-54881369efa0\student_future_1776499696773.png', 'student_future.png')
    ]
    
    out_dir = r"D:\projectlocal\clevai\aca.createfile\PLAYGROUND.Brainstorm\hvan\Timhieulucluonganninh\interactive_longform\assets\images"
    os.makedirs(out_dir, exist_ok=True)
    
    for in_path, out_name in images:
        out_path = os.path.join(out_dir, out_name)
        process_image(in_path, out_path)
