package com.hazerbaker.yakitanaliz.service.util;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

public class ImageUtil {

    public ImageUtil() {
        
    }

    public static byte[] resize(byte[] photo, int width) throws IOException {
        ByteArrayInputStream bais = new ByteArrayInputStream(photo);
        BufferedImage img = ImageIO.read(bais);
        int height = (img.getHeight() * width) / img.getWidth();
        Image tmp = img.getScaledInstance(width, height, Image.SCALE_SMOOTH);
        BufferedImage resized = new BufferedImage(width, height, img.getType());
        Graphics2D g2d = resized.createGraphics();
        g2d.drawImage(tmp, 0, 0, null);
        g2d.dispose();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(resized, "JPG", baos);
        return baos.toByteArray();
    }

}