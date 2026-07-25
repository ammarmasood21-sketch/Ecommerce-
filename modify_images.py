import os
from PIL import Image, ImageEnhance

def shift_hue(img, hue_adjust):
    """Shifts the hue of an image in HSV space."""
    hsv_image = img.convert('HSV')
    h, s, v = hsv_image.split()
    
    h_data = h.load()
    for y in range(h.size[1]):
        for x in range(h.size[0]):
            h_data[x, y] = (h_data[x, y] + hue_adjust) % 256
            
    shifted_hsv = Image.merge('HSV', (h, s, v))
    return shifted_hsv.convert('RGB')

def adjust_image(img_path, hue_shift, brightness=1.0, contrast=1.0):
    img = Image.open(img_path)
    
    if hue_shift != 0:
        img = shift_hue(img, hue_shift)
        
    if brightness != 1.0:
        enhancer = ImageEnhance.Brightness(img)
        img = enhancer.enhance(brightness)
        
    if contrast != 1.0:
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(contrast)
        
    return img

def main():
    images_dir = r"C:\Users\SmartTech\.gemini\antigravity\scratch\3d-ecommerce-store\images"
    
    # We only process the ones we need to generate programmatically.
    # We copy the main generated ones directly or shift them to create unique catalog variants.
    manifest = [
        # Watch 1 and 3 (Watch 2 is already generated from a unique photo)
        {"base": "watch.png", "out": "watch_1.png", "hue": 0, "bright": 1.0, "contrast": 1.0},
        {"base": "watch.png", "out": "watch_3.png", "hue": 140, "bright": 1.1, "contrast": 1.2}, # Silver-blue steel chronograph
        
        # Perfume 1 (Perfume 2 and 3 are already generated from unique photos)
        {"base": "perfume.png", "out": "perfume_1.png", "hue": 0, "bright": 1.0, "contrast": 1.0},
        
        # Joggers
        {"base": "joggers.png", "out": "joggers_1.png", "hue": 0, "bright": 1.0, "contrast": 1.0},
        {"base": "joggers.png", "out": "joggers_2.png", "hue": 55, "bright": 0.95, "contrast": 1.1}, # Volt green
        {"base": "joggers.png", "out": "joggers_3.png", "hue": 110, "bright": 1.0, "contrast": 1.05}, # Steel blue
        
        # Shirts
        {"base": "shirt.png", "out": "shirt_1.png", "hue": 0, "bright": 1.0, "contrast": 1.0},
        {"base": "shirt.png", "out": "shirt_2.png", "hue": 90, "bright": 1.05, "contrast": 1.0}, # Ocean blue
        {"base": "shirt.png", "out": "shirt_3.png", "hue": 175, "bright": 0.95, "contrast": 1.1}, # Salmon pink
        
        # Pants
        {"base": "pants.png", "out": "pants_1.png", "hue": 0, "bright": 1.0, "contrast": 1.0},
        {"base": "pants.png", "out": "pants_2.png", "hue": 105, "bright": 1.0, "contrast": 1.0}, # Navy blue
        {"base": "pants.png", "out": "pants_3.png", "hue": 210, "bright": 0.95, "contrast": 1.05}, # Forest olive
        
        # Ladies Wear (Ladies dress)
        {"base": "ladies_dress.png", "out": "ladies_dress_1.png", "hue": 0, "bright": 1.0, "contrast": 1.0},
        {"base": "ladies_dress.png", "out": "ladies_dress_2.png", "hue": 45, "bright": 0.9, "contrast": 1.15}, # Crimson red
        {"base": "ladies_dress.png", "out": "ladies_dress_3.png", "hue": 130, "bright": 1.0, "contrast": 1.05}, # Ocean sapphire
    ]
    
    print("Processing images manifest (skipping unique photos)...")
    for item in manifest:
        base_path = os.path.join(images_dir, item["base"])
        out_path = os.path.join(images_dir, item["out"])
        
        if not os.path.exists(base_path):
            print(f"Base file not found: {base_path}")
            continue
            
        print(f"Modifying {item['base']} -> {item['out']} (Hue: {item['hue']}, Brightness: {item['bright']}, Contrast: {item['contrast']})")
        modified = adjust_image(base_path, item["hue"], item["bright"], item["contrast"])
        modified.save(out_path)
        
    print("All additional images generated successfully!")

if __name__ == "__main__":
    main()
